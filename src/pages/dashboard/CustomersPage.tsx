
import BusinessDashboardLayout from "@/components/business/BusinessDashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CustomerTier = "platinum" | "gold" | "silver" | "bronze";

type Customer = {
  id: string;
  name: string;
  tier: CustomerTier;
  spendAmount: number;
  joinDate: string;
  lastVisit: string;
  email?: string;
  phone?: string;
};

const CustomersPage = () => {
  // Mock customer data
  const customers: Customer[] = [
    { id: "1", name: "Alex Thompson", tier: "platinum", spendAmount: 1230, joinDate: "2023-01-15", lastVisit: "2023-06-01", email: "alex@example.com" },
    { id: "2", name: "Jamie Rodriguez", tier: "gold", spendAmount: 856, joinDate: "2023-02-22", lastVisit: "2023-05-28", phone: "555-123-4567" },
    { id: "3", name: "Taylor Kim", tier: "silver", spendAmount: 492, joinDate: "2023-03-10", lastVisit: "2023-05-25", email: "taylor@example.com" },
    { id: "4", name: "Jordan Lee", tier: "bronze", spendAmount: 175, joinDate: "2023-04-05", lastVisit: "2023-05-20", email: "jordan@example.com" },
    { id: "5", name: "Casey Morgan", tier: "platinum", spendAmount: 1450, joinDate: "2023-01-05", lastVisit: "2023-06-02", phone: "555-987-6543" },
    { id: "6", name: "Riley Johnson", tier: "gold", spendAmount: 720, joinDate: "2023-02-15", lastVisit: "2023-05-29", email: "riley@example.com" },
    { id: "7", name: "Sam Wilson", tier: "silver", spendAmount: 345, joinDate: "2023-03-22", lastVisit: "2023-05-18", email: "sam@example.com" },
    { id: "8", name: "Avery Smith", tier: "bronze", spendAmount: 120, joinDate: "2023-04-18", lastVisit: "2023-05-15", phone: "555-456-7890" },
  ];

  // Count customers by tier
  const tierCounts = customers.reduce((counts, customer) => {
    counts[customer.tier] = (counts[customer.tier] || 0) + 1;
    return counts;
  }, {} as Record<CustomerTier, number>);

  // Calculate tier thresholds
  const tierThresholds = {
    platinum: 1000,
    gold: 500,
    silver: 250,
    bronze: 0
  };

  const getTierColor = (tier: CustomerTier) => {
    switch (tier) {
      case "platinum":
        return "bg-gray-300";
      case "gold":
        return "bg-yellow-400";
      case "silver":
        return "bg-gray-400";
      case "bronze":
        return "bg-amber-700";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <BusinessDashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="list">Customer List</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="bg-secondary/10 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Loyalty Program Overview</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {(["platinum", "gold", "silver", "bronze"] as const).map((tier) => (
                  <div key={tier} className="bg-secondary/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${getTierColor(tier)}`} />
                      <h3 className="font-medium capitalize">{tier}</h3>
                    </div>
                    <p className="text-2xl font-bold">{tierCounts[tier] || 0}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tier === "platinum" ? "VIP customers" : 
                       tier === "gold" ? "High-value customers" : 
                       tier === "silver" ? "Regular customers" : 
                       "New customers"}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="bg-secondary/30 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Tier Requirements</h3>
                <div className="space-y-3">
                  {(["platinum", "gold", "silver", "bronze"] as const).map((tier) => (
                    <div key={tier} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getTierColor(tier)}`} />
                        <span className="capitalize">{tier}</span>
                      </div>
                      <div className="text-sm">
                        {tier !== "bronze" ? `$${tierThresholds[tier]}+ spent` : "Any purchase"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-6">
            <div className="bg-secondary/10 p-4 rounded-lg overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4">Customer List</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left font-medium">Name</th>
                      <th className="py-2 px-4 text-left font-medium">Tier</th>
                      <th className="py-2 px-4 text-left font-medium">Total Spent</th>
                      <th className="py-2 px-4 text-left font-medium">Last Visit</th>
                      <th className="py-2 px-4 text-left font-medium">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b">
                        <td className="py-3 px-4">{customer.name}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getTierColor(customer.tier)}`} />
                            <span className="capitalize">{customer.tier}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">${customer.spendAmount}</td>
                        <td className="py-3 px-4">{new Date(customer.lastVisit).toLocaleDateString()}</td>
                        <td className="py-3 px-4 text-sm">
                          {customer.email || customer.phone}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                Showing {customers.length} customers
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </BusinessDashboardLayout>
  );
};

export default CustomersPage;
