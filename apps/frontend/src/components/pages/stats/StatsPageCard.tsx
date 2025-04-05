export default function StatPageCard({ icon: Icon, label, value, bgColor, iconColor }: {
  icon: React.ElementType;
  label: string;
  value: number;
  bgColor: string
  iconColor: string
}) {
  return (
    <div className="bg-card-800/50 backdrop-blur-sm rounded-xl p-4 border border-secondary-700">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-full ${bgColor}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm text-primary/70">{label}</p>
          <p className={`text-xl font-semibold text-primary/90 ${label === "Score" ? value < 50 ? "text-red-500" : "" : ""}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}