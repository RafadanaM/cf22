import { AttendingDay } from '@/shared/types/circle';

export function attendingDaysToString(attendingDays: AttendingDay[]): string {
  return `Day ${getDayAmount(attendingDays)}`;
}

function getDayAmount(attendingDays: AttendingDay[]): string {
  if (attendingDays.includes('SAT') && attendingDays.includes('SUN')) {
    return '1 & 2';
  }

  return attendingDays.includes('SAT') ? '1' : '2';
}
