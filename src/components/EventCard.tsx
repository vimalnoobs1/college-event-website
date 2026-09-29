import React from 'react';
import { HelpCircle, Code2, Presentation, Cpu, Bug, Palette, Calendar, MapPin, Users, ArrowUpRight } from 'lucide-react';
import { EventItem } from '../types';

interface EventCardProps {
  event: EventItem;
  onSelectEvent: (eventId: string) => void;
  onOpenDetails: (event: EventItem) => void;
}

const getEventTheme = (id: string) => {
  switch (id) {
    case 'quiz':
      return {
        icon: HelpCircle,
        iconColor: 'text-amber-400',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/20',
        hoverBorder: 'hover:border-amber-500/50',
        tagColor: 'text-amber-400'
      };
    case 'coding':
      return {
        icon: Code2,
        iconColor: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        hoverBorder: 'hover:border-blue-500/50',
        tagColor: 'text-blue-400'
      };
    case 'paper':
      return {
        icon: Presentation,
        iconColor: 'text-indigo-450',
        bgColor: 'bg-indigo-500/10',
        borderColor: 'border-indigo-500/20',
        hoverBorder: 'hover:border-indigo-500/50',
        tagColor: 'text-indigo-400'
      };
    case 'expo':
      return {
        icon: Cpu,
        iconColor: 'text-emerald-450',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/20',
        hoverBorder: 'hover:border-emerald-500/50',
        tagColor: 'text-emerald-400'
      };
    case 'debugging':
      return {
        icon: Bug,
        iconColor: 'text-rose-450',
        bgColor: 'bg-rose-500/10',
        borderColor: 'border-rose-500/20',
        hoverBorder: 'hover:border-rose-500/50',
        tagColor: 'text-rose-400'
      };
    case 'poster':
      return {
        icon: Palette,
        iconColor: 'text-violet-450',
        bgColor: 'bg-violet-500/10',
        borderColor: 'border-violet-500/20',
        hoverBorder: 'hover:border-violet-500/50',
        tagColor: 'text-violet-400'
      };
    default:
      return {
        icon: HelpCircle,
        iconColor: 'text-slate-400',
        bgColor: 'bg-slate-500/10',
        borderColor: 'border-slate-500/20',
        hoverBorder: 'hover:border-slate-500/50',
        tagColor: 'text-slate-400'
      };
  }
};

export default function EventCard({ event, onSelectEvent, onOpenDetails }: EventCardProps) {
  const theme = getEventTheme(event.id);
  const IconComponent = theme.icon;

  return (
    <div
      className={`bg-slate-900 border border-slate-800/85 ${theme.hoverBorder} rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group h-full select-none`}
    >
      {/* Upper Content */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${theme.bgColor} border ${theme.borderColor} transition-colors duration-300 group-hover:scale-105`}>
            <IconComponent className={`w-5.5 h-5.5 ${theme.iconColor}`} />
          </div>
          
          <button
            onClick={() => onOpenDetails(event)}
            className="text-slate-500 hover:text-slate-350 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="View rules and coordinators details"
          >
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2.5">
          {event.name}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-xs sm:text-sm mb-5 leading-relaxed line-clamp-2">
          {event.shortDesc}
        </p>
      </div>

      {/* Middle Parameters */}
      <div className="border-t border-slate-800/80 pt-4 mt-auto space-y-3 text-xs text-slate-400">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-4 h-4 text-slate-550 shrink-0" />
          <span className="font-semibold text-slate-300">{event.dateTime}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <MapPin className="w-4 h-4 text-slate-550 shrink-0" />
          <span className="truncate text-slate-350" title={event.venue}>{event.venue}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <Users className="w-4 h-4 text-slate-550 shrink-0" />
          <span>
            Team Limit:{' '}
            <span className="font-bold text-slate-200">
              {event.maxParticipants} {event.maxParticipants === 1 ? 'Student' : 'Students'}
            </span>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 mt-5.5 pt-3.5 border-t border-slate-800/60">
        <button
          onClick={() => onOpenDetails(event)}
          className="px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all cursor-pointer text-center"
        >
          View Brief
        </button>
        <button
          onClick={() => onSelectEvent(event.id)}
          className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-750 rounded-xl transition-all cursor-pointer text-center shadow hover:scale-[1.02]"
        >
          Lock Seat
        </button>
      </div>
    </div>
  );
}
