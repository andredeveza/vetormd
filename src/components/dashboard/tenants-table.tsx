import { Card } from "@/components/ui/card";
import { Tenant } from "@/types";

export function TenantsTable({ tenants }: { tenants: Tenant[] }) {
  return (
    <Card title="Gestão de inquilinos" action={<button className="text-sm text-brand-700">+ Novo inquilino</button>}>
      <div className="overflow-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-slate-800">
            <tr>
              <th className="py-2">Nome</th>
              <th className="py-2">Contato</th>
              <th className="py-2">Documento</th>
              <th className="py-2">Histórico</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="border-b border-slate-100 dark:border-slate-900">
                <td className="py-3 font-medium">{tenant.fullName}</td>
                <td className="py-3 text-slate-500">
                  <p>{tenant.email}</p>
                  <p>{tenant.phone}</p>
                </td>
                <td className="py-3">{tenant.document}</td>
                <td className="py-3">{tenant.contractHistory} contrato(s)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
