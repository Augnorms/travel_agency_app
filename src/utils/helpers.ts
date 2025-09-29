// Utility: Get initials from name
export function getInitials(fullName: string): string {
  const words = fullName.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
