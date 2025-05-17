import React from "react";
import Hero from "../components/layout-componenets/Hero";
import ContentTable from "../components/layout-componenets/ContentTable";
import RecentActs from "../components/layout-componenets/RecentActs";
import ContactUs from "../components/layout-componenets/ContactUs";

const Index = () => {
  return (
    <>
      <Hero />
      <ContentTable />
      <RecentActs />
      <ContactUs />
    </>
  );
};

export default Index;
