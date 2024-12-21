import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, DollarSign, Users, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Receivables",
      value: "$12,345",
      icon: <DollarSign className="h-6 w-6 text-blue-500" />,
      change: "+12%",
    },
    {
      title: "Pending Bills",
      value: "$5,432",
      icon: <FileText className="h-6 w-6 text-orange-500" />,
      change: "-2%",
    },
    {
      title: "Active Clients",
      value: "45",
      icon: <Users className="h-6 w-6 text-green-500" />,
      change: "+5%",
    },
    {
      title: "Monthly Revenue",
      value: "$54,321",
      icon: <BarChart className="h-6 w-6 text-purple-500" />,
      change: "+8%",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">WonderPay</h1>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate("/settings")}>
              Settings
            </Button>
            <Button>Log In</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome to WonderPay</h2>
          <p className="text-muted-foreground">
            Your financial operations dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span
                    className={
                      stat.change.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Bill Pay</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Manage your accounts payable and process invoices
              </p>
              <Button className="w-full" onClick={() => navigate("/bill-pay")}>
                View Bills
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Receivables</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Track and manage accounts receivable
              </p>
              <Button className="w-full" onClick={() => navigate("/receivables")}>
                View Receivables
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clients & Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Manage your business relationships
              </p>
              <Button
                className="w-full"
                onClick={() => navigate("/clients-vendors")}
              >
                View Directory
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;