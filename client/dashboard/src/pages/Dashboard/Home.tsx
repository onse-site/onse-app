import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
/* import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget"; */
import RecentOrders1 from "../../components/ecommerce/RecentOrders1";
import RecentOrders2 from "../../components/ecommerce/RecentOrders2";
import RecentOrders3 from "../../components/ecommerce/RecentOrders3";
/* import DemographicCard from "../../components/ecommerce/DemographicCard"; */
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Offices Pristine controll Dashboard"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
          <RecentOrders1 />
          {/* <MonthlySalesChart /> */}
        </div>

        {/*  <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div> */}

        {/*  <div className="col-span-12">
          <StatisticsChart />
        </div> */}
        {
          <div className="col-span-12 xl:col-span-5 flex flex-col gap-4">
            <RecentOrders2 />
            <RecentOrders3 />
          </div>
        }

        {/*  <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div> */}
      </div>
    </>
  );
}
