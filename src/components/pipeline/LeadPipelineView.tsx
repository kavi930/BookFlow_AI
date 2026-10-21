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

  // Confirmation modal for resetting demo data
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  // Manual Add Lead Modal
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

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    // Category match
    if (categoryFilter !== 'all' && lead.category !== categoryFilter) {
      return false;
    }
    // Status match
    if (statusFilter !== 'all' && lead.status !== statusFilter) {
      return false;
    }
    // Search query match
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
        return <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />;
      case 'restaurants':
        return <UtensilsCrossed className="w-3.5 h-3.5 text-cyan-400" />;
      case 'gyms':
        return <Dumbbell className="w-3.5 h-3.5 text-cyan-400" />;
      case 'salons':
        return <Sparkle className="w-3.5 h-3.5 text-cyan-400" />;
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>LOCAL SESSION CRM</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Lead Qualification Pipeline
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Simulated CRM repository. Inspect, update status, and manage captured customer leads.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Demo Lead</span>
          </button>

          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs rounded-lg transition-colors"
            title="Restore initial 8 sample leads"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-[#0B142A] border border-slate-800/90 rounded-xl p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads by name, service, ID, or notes..."
              className="w-full bg-[#080E1C] border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg pl-9 pr-8 py-2 text-xs text-slate-100 placeholder:text-slate-500 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Counter */}
          <div className="text-xs text-slate-400 font-mono">
            Showing <span className="text-cyan-300 font-bold tabular-nums">{filteredLeads.length}</span> of {leads.length} leads
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/70 text-xs">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-slate-400 font-mono text-[11px] shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-cyan-400" />
              <span>Vertical:</span>
            </span>
            {(['all', 'clinics', 'restaurants', 'gyms', 'salons'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded text-xs font-medium capitalize transition-colors whitespace-nowrap ${
                  categoryFilter === cat
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Verticals' : cat}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-slate-400 font-mono text-[11px] shrink-0 mr-1">
              Status:
            </span>
            {(['all', 'New', 'Contact Required', 'Follow-up', 'Completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                  statusFilter === status
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {status === 'all' ? 'All Statuses' : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Leads Table */}
      <div className="bg-[#0B142A] border border-slate-800/90 rounded-xl overflow-hidden shadow-sm">
        {filteredLeads.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <AlertCircle className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">No Matching Leads Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                Try adjusting your search criteria or resetting filters to see all sample records.
              </p>
            </div>
            <button
              onClick={() => {
                setCategoryFilter('all');
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-md transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#080E1C] border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
                  <th className="py-3 px-4 font-semibold">Lead ID & Name</th>
                  <th className="py-3 px-4 font-semibold">Vertical</th>
                  <th className="py-3 px-4 font-semibold">Requested Service</th>
                  <th className="py-3 px-4 font-semibold">Date & Time</th>
                  <th className="py-3 px-4 font-semibold">Status (Simulated)</th>
                  <th className="py-3 px-4 font-semibold">Source</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {filteredLeads.map((lead) => {
                  const isNew = lead.status === 'New';
                  const isContact = lead.status === 'Contact Required';
                  const isFollowup = lead.status === 'Follow-up';
                  const isCompleted = lead.status === 'Completed';

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-850/60 transition-colors group cursor-pointer"
                      onClick={() => setSelectedLeadForDetail(lead)}
                    >
                      {/* Name & ID */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {lead.leadName}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          {lead.id}
                        </div>
                      </td>

                      {/* Vertical */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-slate-300 font-medium capitalize">
                          {getCategoryIcon(lead.category)}
                          <span>{lead.category}</span>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-3 px-4">
                        <div className="text-slate-200 font-medium truncate max-w-[180px]">
                          {lead.requestedService}
                        </div>
                        {lead.partySize && (
                          <div className="text-[10px] text-cyan-400 font-mono">
                            Party of {lead.partySize}
                          </div>
                        )}
                        {lead.fitnessGoal && (
                          <div className="text-[10px] text-cyan-400 truncate max-w-[150px]">
                            {lead.fitnessGoal}
                          </div>
                        )}
                        {lead.preferredProvider && (
                          <div className="text-[10px] text-cyan-400 truncate max-w-[150px]">
                            {lead.preferredProvider}
                          </div>
                        )}
                      </td>

                      {/* Date & Time */}
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-300">
                        <div>{lead.preferredDate || lead.enquiryDate}</div>
                        <div className="text-[10px] text-slate-400">{lead.preferredTime || 'Standard slot'}</div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap ${
                            isNew
                              ? 'bg-blue-950 text-cyan-300 border border-cyan-800/60'
                              : isContact
                              ? 'bg-amber-950/70 text-amber-300 border border-amber-800/50'
                              : isFollowup
                              ? 'bg-purple-950/70 text-purple-300 border border-purple-800/50'
                              : 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/50'
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>

                      {/* Source */}
                      <td className="py-3 px-4 text-slate-400 text-[11px] truncate max-w-[130px]">
                        {lead.leadSource}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedLeadForDetail(lead)}
                            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition-colors"
                            title="Inspect lead record"
                            aria-label={`View details for ${lead.leadName}`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
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
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setSelectedLeadForDetail(null)}
            aria-hidden="true"
          />

          {/* Slide-over Panel */}
          <div className="relative w-full max-w-md h-full max-h-[90vh] sm:max-h-screen bg-[#0A1329] border-l border-slate-800 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl z-10">
            <div className="space-y-5">
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <span>RECORD {selectedLeadForDetail.id}</span>
                    <span className="text-slate-600">·</span>
                    <span className="capitalize">{selectedLeadForDetail.category}</span>
                  </div>
                  <h2 id="slideover-title" className="text-lg font-bold text-white mt-1">
                    {selectedLeadForDetail.leadName}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedLeadForDetail(null)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Selector */}
              <div className="bg-[#080E1C] p-3.5 rounded-lg border border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Update Simulated Status:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['New', 'Contact Required', 'Follow-up', 'Completed'] as LeadStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => updateLeadStatus(selectedLeadForDetail.id, st)}
                      className={`text-xs py-1.5 px-2 rounded-md font-medium text-center transition-colors ${
                        selectedLeadForDetail.status === st
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
                <div className="pt-1 text-[10px] text-slate-400 font-mono">
                  *Status transitions are local simulations. No external calendar is affected.
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-xs">
                <span className="text-[11px] font-mono uppercase text-slate-400">
                  Contact Coordinates
                </span>
                <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg space-y-2 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{selectedLeadForDetail.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{selectedLeadForDetail.contactPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Preferred Date: {selectedLeadForDetail.preferredDate || 'Flexible'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Slot: {selectedLeadForDetail.preferredTime || 'Standard'}</span>
                  </div>
                </div>
              </div>

              {/* Requested Service & Context */}
              <div className="space-y-2 text-xs">
                <span className="text-[11px] font-mono uppercase text-slate-400">
                  Enquiry Specification
                </span>
                <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg space-y-1.5 text-slate-300">
                  <div>
                    <span className="text-slate-400">Requested Service: </span>
                    <span className="font-semibold text-white">{selectedLeadForDetail.requestedService}</span>
                  </div>
                  {selectedLeadForDetail.partySize && (
                    <div>
                      <span className="text-slate-400">Party Size: </span>
                      <span className="text-cyan-300">{selectedLeadForDetail.partySize} guests</span>
                    </div>
                  )}
                  {selectedLeadForDetail.fitnessGoal && (
                    <div>
                      <span className="text-slate-400">Fitness Focus: </span>
                      <span className="text-cyan-300">{selectedLeadForDetail.fitnessGoal}</span>
                    </div>
                  )}
                  {selectedLeadForDetail.preferredProvider && (
                    <div>
                      <span className="text-slate-400">Requested Provider: </span>
                      <span className="text-cyan-300">{selectedLeadForDetail.preferredProvider}</span>
                    </div>
                  )}
                  <div className="pt-1 border-t border-slate-800">
                    <span className="text-slate-400">Prospect Notes: </span>
                    <p className="mt-0.5 text-slate-200 italic">
                      "{selectedLeadForDetail.notes}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Fictional Staff Action Log */}
              {selectedLeadForDetail.fictionalStaffNote && (
                <div className="space-y-2 text-xs">
                  <span className="text-[11px] font-mono uppercase text-slate-400">
                    Automated Staff Action
                  </span>
                  <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-lg text-cyan-300 text-[11px] leading-relaxed">
                    {selectedLeadForDetail.fictionalStaffNote}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => deleteLead(selectedLeadForDetail.id)}
                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded hover:bg-red-950/30 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>

              <button
                onClick={() => setSelectedLeadForDetail(null)}
                className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium transition-colors"
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
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setIsAddLeadModalOpen(false)}
          />
          <div className="relative bg-[#0A1329] border border-cyan-500/30 rounded-xl max-w-md w-full p-6 text-slate-100 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Log Simulated Manual Lead</h3>
              <button
                onClick={() => setIsAddLeadModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Taylor Ross"
                  value={newLeadForm.leadName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, leadName: e.target.value })}
                  className="w-full bg-[#080E1C] border border-slate-700 rounded-md px-3 py-1.5 text-xs text-slate-100 outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="name@demo.test"
                    value={newLeadForm.contactEmail}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, contactEmail: e.target.value })}
                    className="w-full bg-[#080E1C] border border-slate-700 rounded-md px-3 py-1.5 text-xs text-slate-100 outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="(555) 123-4567"
                    value={newLeadForm.contactPhone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, contactPhone: e.target.value })}
                    className="w-full bg-[#080E1C] border border-slate-700 rounded-md px-3 py-1.5 text-xs text-slate-100 outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Vertical</label>
                  <select
                    value={newLeadForm.category}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, category: e.target.value as BusinessCategory })}
                    className="w-full bg-[#080E1C] border border-slate-700 rounded-md px-3 py-1.5 text-xs text-slate-100 outline-none"
                  >
                    <option value="clinics">CarePoint Clinic</option>
                    <option value="restaurants">Urban Table</option>
                    <option value="gyms">FitCore Studio</option>
                    <option value="salons">Glow & Co.</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Service</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.requestedService}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, requestedService: e.target.value })}
                    className="w-full bg-[#080E1C] border border-slate-700 rounded-md px-3 py-1.5 text-xs text-slate-100 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Enquiry Notes</label>
                <textarea
                  rows={2}
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="w-full bg-[#080E1C] border border-slate-700 rounded-md px-3 py-1.5 text-xs text-slate-100 outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-700 rounded text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 font-semibold text-slate-950 rounded"
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
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setIsResetConfirmOpen(false)}
          />
          <div className="relative bg-[#0A1329] border border-amber-600/40 rounded-xl max-w-sm w-full p-5 text-slate-100 shadow-2xl z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Reset Pipeline Data?</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  This will restore the 8 default fictional records and clear custom demo leads created during this session.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3 py-1.5 border border-slate-700 rounded text-xs text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetDemoData();
                  setIsResetConfirmOpen(false);
                }}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 font-semibold text-xs text-white rounded transition-colors"
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
