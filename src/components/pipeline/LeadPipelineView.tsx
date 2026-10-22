import React, { useState } from 'react';
import {
  Search,
  Filter,
  RotateCcw,
  Plus,
  Eye,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  Phone,
  Mail,
  User,
  ShieldCheck,
  Stethoscope,
  UtensilsCrossed,
  Dumbbell,
  Sparkle
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { BusinessCategory, LeadRecord, LeadStatus } from '../../types';

export const LeadPipelineView: React.FC = () => {
  const {
    leads,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    updateLeadStatus,
    deleteLead,
    resetDemoData,
    selectedLeadForDetail,
    setSelectedLeadForDetail,
    addLead
  } = useDemo();

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    leadName: '',
    contactEmail: '',
    contactPhone: '',
    category: 'clinics' as BusinessCategory,
    requestedService: 'General Consultation',
    preferredDate: '2026-10-26',
    preferredTime: 'Morning (10:00 AM)',
    notes: 'Manually logged phone walk-in enquiry.'
  });

  const filteredLeads = leads.filter((lead) => {
    if (categoryFilter !== 'all' && lead.category !== categoryFilter) {
      return false;
    }
    if (statusFilter !== 'all' && lead.status !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = lead.leadName.toLowerCase().includes(q);
      const matchService = lead.requestedService.toLowerCase().includes(q);
      const matchNotes = lead.notes.toLowerCase().includes(q);
      const matchId = lead.id.toLowerCase().includes(q);
      if (!matchName && !matchService && !matchNotes && !matchId) {
        return false;
      }
    }
    return true;
  });

  const getCategoryIcon = (cat: BusinessCategory) => {
    switch (cat) {
      case 'clinics':
        return <Stethoscope className="w-3.5 h-3.5 text-[#2D5A43]" />;
      case 'restaurants':
        return <UtensilsCrossed className="w-3.5 h-3.5 text-[#2D5A43]" />;
      case 'gyms':
        return <Dumbbell className="w-3.5 h-3.5 text-[#2D5A43]" />;
      case 'salons':
        return <Sparkle className="w-3.5 h-3.5 text-[#2D5A43]" />;
    }
  };

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.leadName.trim()) return;

    addLead({
      leadName: newLeadForm.leadName.trim(),
      contactEmail: newLeadForm.contactEmail.trim() || 'unspecified@demo.test',
      contactPhone: newLeadForm.contactPhone.trim() || '(555) 000-0000',
      category: newLeadForm.category,
      requestedService: newLeadForm.requestedService,
      enquiryDate: new Date().toISOString().split('T')[0],
      preferredDate: newLeadForm.preferredDate,
      preferredTime: newLeadForm.preferredTime,
      status: 'New',
      leadSource: 'Manual CRM Entry (Demo)',
      notes: newLeadForm.notes,
      fictionalStaffNote: 'Created manually in demo pipeline.'
    });

    setIsAddLeadModalOpen(false);
    setNewLeadForm({
      leadName: '',
      contactEmail: '',
      contactPhone: '',
      category: 'clinics',
      requestedService: 'General Consultation',
      preferredDate: '2026-10-26',
      preferredTime: 'Morning (10:00 AM)',
      notes: 'Manually logged phone walk-in enquiry.'
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-[#1A1D1C]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E7E2DA]">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1D1C] tracking-tight">
            Lead Qualification Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-[#5D6B66] mt-0.5">
            Organise and track simulated customer enquiries across your business verticals.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E3A2F] hover:bg-[#284E3F] text-white font-medium text-xs rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Demo Lead</span>
          </button>

          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F3EFE9] border border-[#DCD6CC] text-xs text-[#52605B] hover:text-[#1A1D1C] rounded-lg transition-colors"
            title="Restore initial 8 sample leads"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#73827D]" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white border border-[#E3DDD3] rounded-xl p-4 space-y-3 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#7C8B85] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads by name, service, ID, or notes..."
              className="w-full bg-[#FAF8F5] border border-[#DCD6CC] focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F] rounded-lg pl-9 pr-8 py-2 text-xs text-[#1A1D1C] placeholder:text-[#83918C] outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7C8B85] hover:text-[#1A1D1C]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-[#5C6A65] font-mono">
            Showing <strong className="text-[#1E3A2F]">{filteredLeads.length}</strong> of {leads.length} leads
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#EFEBE4] text-xs">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-[#64726D] font-mono text-[11px] shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#2D5A43]" />
              <span>Vertical:</span>
            </span>
            {(['all', 'clinics', 'restaurants', 'gyms', 'salons'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors whitespace-nowrap ${
                  categoryFilter === cat
                    ? 'bg-[#1E3A2F] text-white font-semibold shadow-xs'
                    : 'text-[#586460] hover:text-[#1A1D1C] hover:bg-[#FAF8F5]'
                }`}
              >
                {cat === 'all' ? 'All Verticals' : cat}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-[#64726D] font-mono text-[11px] shrink-0 mr-1">
              Status:
            </span>
            {(['all', 'New', 'Contact Required', 'Follow-up', 'Completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  statusFilter === status
                    ? 'bg-[#1E3A2F] text-white font-semibold shadow-xs'
                    : 'text-[#586460] hover:text-[#1A1D1C] hover:bg-[#FAF8F5]'
                }`}
              >
                {status === 'all' ? 'All Statuses' : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Leads Table */}
      <div className="bg-white border border-[#E3DDD3] rounded-xl overflow-hidden shadow-xs">
        {filteredLeads.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E3DDD3] flex items-center justify-center mx-auto text-[#798883]">
              <AlertCircle className="w-5 h-5 text-[#798883]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#1A1D1C]">No Matching Leads Found</h3>
              <p className="text-xs text-[#697772] max-w-sm mx-auto mt-1">
                Try adjusting your search criteria or resetting filters to see all sample records.
              </p>
            </div>
            <button
              onClick={() => {
                setCategoryFilter('all');
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F2EEE7] border border-[#DCD6CC] text-xs text-[#3E4945] rounded-md transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#EAE5DC] text-[#697772] font-mono text-[11px]">
                  <th className="py-3 px-4 font-semibold">Lead ID & Name</th>
                  <th className="py-3 px-4 font-semibold">Vertical</th>
                  <th className="py-3 px-4 font-semibold">Requested Service</th>
                  <th className="py-3 px-4 font-semibold">Date & Time</th>
                  <th className="py-3 px-4 font-semibold">Simulated Status</th>
                  <th className="py-3 px-4 font-semibold">Source</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFEBE4]">
                {filteredLeads.map((lead) => {
                  const isNew = lead.status === 'New';
                  const isContact = lead.status === 'Contact Required';
                  const isFollowup = lead.status === 'Follow-up';

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                      onClick={() => setSelectedLeadForDetail(lead)}
                    >
                      {/* Name & ID */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-[#1A1D1C] hover:text-[#1E3A2F]">
                          {lead.leadName}
                        </div>
                        <div className="text-[10px] font-mono text-[#7D8C86]">
                          {lead.id}
                        </div>
                      </td>

                      {/* Vertical */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-[#3A4642] font-medium capitalize">
                          {getCategoryIcon(lead.category)}
                          <span>{lead.category}</span>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-3 px-4">
                        <div className="text-[#1A1D1C] font-medium truncate max-w-[180px]">
                          {lead.requestedService}
                        </div>
                        {lead.partySize && (
                          <div className="text-[10px] text-[#2D5A43] font-mono">
                            Party of {lead.partySize}
                          </div>
                        )}
                        {lead.fitnessGoal && (
                          <div className="text-[10px] text-[#2D5A43] truncate max-w-[150px]">
                            {lead.fitnessGoal}
                          </div>
                        )}
                        {lead.preferredProvider && (
                          <div className="text-[10px] text-[#2D5A43] truncate max-w-[150px]">
                            {lead.preferredProvider}
                          </div>
                        )}
                      </td>

                      {/* Date & Time */}
                      <td className="py-3 px-4 font-mono text-[11px] text-[#4F5C57]">
                        <div>{lead.preferredDate || lead.enquiryDate}</div>
                        <div className="text-[10px] text-[#7C8B85]">{lead.preferredTime || 'Standard slot'}</div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap ${
                            isNew
                              ? 'bg-[#EBF1EC] text-[#1E3A2F] border border-[#CCDCD0]'
                              : isContact
                              ? 'bg-[#FEF3E2] text-[#8C5E09] border border-[#F3DFC1]'
                              : isFollowup
                              ? 'bg-[#F0F4F8] text-[#334E68] border border-[#D9E2EC]'
                              : 'bg-[#EBF1EC] text-[#2D5A43] border border-[#D5E1D8]'
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>

                      {/* Source */}
                      <td className="py-3 px-4 text-[#697672] text-[11px] truncate max-w-[130px]">
                        {lead.leadSource}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedLeadForDetail(lead)}
                            className="p-1.5 rounded hover:bg-[#EAE5DC] text-[#697772] hover:text-[#1A1D1C] transition-colors"
                            title="Inspect lead record"
                            aria-label={`View details for ${lead.leadName}`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-1.5 rounded hover:bg-[#FDF2F2] text-[#697772] hover:text-[#DC2626] transition-colors"
                            title="Remove lead from session"
                            aria-label={`Delete record for ${lead.leadName}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slide-over / Modal for Lead Details */}
      {selectedLeadForDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end p-4 sm:p-0"
          role="dialog"
          aria-modal="true"
          aria-labelledby="slideover-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#1A1D1C]/50 backdrop-blur-xs"
            onClick={() => setSelectedLeadForDetail(null)}
            aria-hidden="true"
          />

          {/* Slide-over Panel */}
          <div className="relative w-full max-w-md h-full max-h-[90vh] sm:max-h-screen bg-white border-l border-[#E2DDD5] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl z-10 text-[#1A1D1C]">
            <div className="space-y-5">
              <div className="flex items-start justify-between pb-4 border-b border-[#E7E2DA]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#2D5A43]">
                    <span>RECORD {selectedLeadForDetail.id}</span>
                    <span className="text-[#CCD5D1]">·</span>
                    <span className="capitalize">{selectedLeadForDetail.category}</span>
                  </div>
                  <h2 id="slideover-title" className="text-lg font-bold text-[#1A1D1C] mt-1">
                    {selectedLeadForDetail.leadName}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedLeadForDetail(null)}
                  className="p-1 rounded text-[#717E79] hover:text-[#1A1D1C]"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Selector */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-[#E7E2DA] space-y-2">
                <label className="block text-xs font-semibold text-[#2F3A36]">
                  Update Simulated Status:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['New', 'Contact Required', 'Follow-up', 'Completed'] as LeadStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => updateLeadStatus(selectedLeadForDetail.id, st)}
                      className={`text-xs py-1.5 px-2 rounded-md font-medium text-center transition-colors ${
                        selectedLeadForDetail.status === st
                          ? 'bg-[#1E3A2F] text-white font-semibold shadow-xs'
                          : 'bg-white hover:bg-[#F2EEE7] text-[#4F5C57] border border-[#DCD6CC]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
                <div className="pt-1 text-[10px] text-[#717E7A] font-mono">
                  *Transitions are local simulations. No external calendar is affected.
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-xs">
                <span className="text-[11px] font-mono uppercase text-[#717E7A] font-semibold">
                  Contact Coordinates
                </span>
                <div className="p-3 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg space-y-2 text-[#3D4744]">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#2D5A43] shrink-0" />
                    <span>{selectedLeadForDetail.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#2D5A43] shrink-0" />
                    <span>{selectedLeadForDetail.contactPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#2D5A43] shrink-0" />
                    <span>Preferred Date: {selectedLeadForDetail.preferredDate || 'Flexible'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#2D5A43] shrink-0" />
                    <span>Slot: {selectedLeadForDetail.preferredTime || 'Standard'}</span>
                  </div>
                </div>
              </div>

              {/* Requested Service & Context */}
              <div className="space-y-2 text-xs">
                <span className="text-[11px] font-mono uppercase text-[#717E7A] font-semibold">
                  Enquiry Specification
                </span>
                <div className="p-3 bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg space-y-1.5 text-[#3D4744]">
                  <div>
                    <span className="text-[#697772]">Requested Service: </span>
                    <span className="font-semibold text-[#1A1D1C]">{selectedLeadForDetail.requestedService}</span>
                  </div>
                  {selectedLeadForDetail.partySize && (
                    <div>
                      <span className="text-[#697772]">Party Size: </span>
                      <span className="text-[#2D5A43] font-medium">{selectedLeadForDetail.partySize} guests</span>
                    </div>
                  )}
                  {selectedLeadForDetail.fitnessGoal && (
                    <div>
                      <span className="text-[#697772]">Fitness Focus: </span>
                      <span className="text-[#2D5A43] font-medium">{selectedLeadForDetail.fitnessGoal}</span>
                    </div>
                  )}
                  {selectedLeadForDetail.preferredProvider && (
                    <div>
                      <span className="text-[#697772]">Requested Provider: </span>
                      <span className="text-[#2D5A43] font-medium">{selectedLeadForDetail.preferredProvider}</span>
                    </div>
                  )}
                  <div className="pt-1 border-t border-[#EAE5DC]">
                    <span className="text-[#697772]">Customer Notes: </span>
                    <p className="mt-0.5 text-[#1A1D1C] italic">
                      "{selectedLeadForDetail.notes}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Fictional Staff Action Log */}
              {selectedLeadForDetail.fictionalStaffNote && (
                <div className="space-y-2 text-xs">
                  <span className="text-[11px] font-mono uppercase text-[#717E7A] font-semibold">
                    Automated Staff Action
                  </span>
                  <div className="p-3 bg-[#EBF1EC] border border-[#CCDCD0] rounded-lg text-[#253D31] text-[11px] leading-relaxed">
                    {selectedLeadForDetail.fictionalStaffNote}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#E7E2DA] flex items-center justify-between">
              <button
                onClick={() => deleteLead(selectedLeadForDetail.id)}
                className="flex items-center gap-1.5 text-xs text-[#DC2626] hover:text-[#991B1B] px-3 py-1.5 rounded-md hover:bg-[#FDF2F2] transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>

              <button
                onClick={() => setSelectedLeadForDetail(null)}
                className="px-4 py-1.5 rounded-md bg-[#1E3A2F] hover:bg-[#284E3F] text-xs text-white font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Lead Modal */}
      {isAddLeadModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-[#1A1D1C]/50 backdrop-blur-xs"
            onClick={() => setIsAddLeadModalOpen(false)}
          />
          <div className="relative bg-white border border-[#E3DDD3] rounded-xl max-w-md w-full p-6 text-[#1A1D1C] shadow-xl z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E2DA]">
              <h3 className="text-base font-bold text-[#1A1D1C]">Log Simulated Manual Lead</h3>
              <button
                onClick={() => setIsAddLeadModalOpen(false)}
                className="p-1 rounded text-[#717E79] hover:text-[#1A1D1C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#2F3A36] font-semibold mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Taylor Ross"
                  value={newLeadForm.leadName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, leadName: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] rounded-md px-3 py-1.5 text-xs text-[#1A1D1C] outline-none focus:border-[#1E3A2F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#2F3A36] font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="name@demo.test"
                    value={newLeadForm.contactEmail}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, contactEmail: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#DCD6CC] rounded-md px-3 py-1.5 text-xs text-[#1A1D1C] outline-none focus:border-[#1E3A2F]"
                  />
                </div>
                <div>
                  <label className="block text-[#2F3A36] font-semibold mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="(555) 123-4567"
                    value={newLeadForm.contactPhone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, contactPhone: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#DCD6CC] rounded-md px-3 py-1.5 text-xs text-[#1A1D1C] outline-none focus:border-[#1E3A2F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#2F3A36] font-semibold mb-1">Vertical</label>
                  <select
                    value={newLeadForm.category}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, category: e.target.value as BusinessCategory })}
                    className="w-full bg-[#FAF8F5] border border-[#DCD6CC] rounded-md px-3 py-1.5 text-xs text-[#1A1D1C] outline-none"
                  >
                    <option value="clinics">CarePoint Clinic</option>
                    <option value="restaurants">Urban Table</option>
                    <option value="gyms">FitCore Studio</option>
                    <option value="salons">Glow & Co.</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#2F3A36] font-semibold mb-1">Service</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.requestedService}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, requestedService: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#DCD6CC] rounded-md px-3 py-1.5 text-xs text-[#1A1D1C] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#2F3A36] font-semibold mb-1">Enquiry Notes</label>
                <textarea
                  rows={2}
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#DCD6CC] rounded-md px-3 py-1.5 text-xs text-[#1A1D1C] outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-3 py-1.5 border border-[#DCD6CC] rounded-md text-[#55635F] hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1E3A2F] hover:bg-[#284E3F] font-semibold text-white rounded-md"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {isResetConfirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-[#1A1D1C]/50 backdrop-blur-xs"
            onClick={() => setIsResetConfirmOpen(false)}
          />
          <div className="relative bg-white border border-[#E3DDD3] rounded-xl max-w-sm w-full p-5 text-[#1A1D1C] shadow-xl z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFF9EE] border border-[#F0E2C8] flex items-center justify-center text-[#8C5E09] shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1A1D1C]">Reset Pipeline Data?</h3>
                <p className="text-xs text-[#5C6A65] mt-0.5">
                  This will restore the 8 default fictional records and clear custom demo leads created during this session.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3 py-1.5 border border-[#DCD6CC] rounded-md text-xs text-[#55635F] hover:bg-[#FAF8F5]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetDemoData();
                  setIsResetConfirmOpen(false);
                }}
                className="px-3.5 py-1.5 bg-[#8C5E09] hover:bg-[#724C06] font-semibold text-xs text-white rounded-md transition-colors"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
