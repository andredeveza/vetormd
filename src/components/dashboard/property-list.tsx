import Image from "next/image";
import { BadgeAlert, BadgeCheck, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Property } from "@/types";
import { currency } from "@/lib/format";

const statusStyles = {
  occupied: { label: "Ocupado", icon: BadgeCheck, classes: "text-emerald-600 bg-emerald-50" },
  vacant: { label: "Vago", icon: BadgeAlert, classes: "text-amber-600 bg-amber-50" },
  maintenance: { label: "Manutenção", icon: Wrench, classes: "text-sky-600 bg-sky-50" }
};

export function PropertyList({ properties }: { properties: Property[] }) {
  return (
    <Card title="Gestão de imóveis" action={<button className="text-sm text-brand-700">+ Novo imóvel</button>}>
      <div className="grid gap-4 md:grid-cols-2">
        {properties.map((property) => {
          const status = statusStyles[property.status];
          const StatusIcon = status.icon;

          return (
            <article key={property.id} className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="relative h-40">
                <Image src={property.photo} alt={property.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold">{property.name}</h4>
                    <p className="text-xs text-slate-500">{property.address}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${status.classes}`}>
                    <StatusIcon size={12} /> {status.label}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-slate-500">Aluguel</p>
                    <p className="font-semibold">{currency(property.rent)}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Ocupação</p>
                    <p className="font-semibold">{property.occupancyRate}%</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Score</p>
                    <p className="font-semibold">{property.profitabilityScore}/100</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Card>
  );
}
