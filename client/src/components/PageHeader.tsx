// ============================================================
// PageHeader.tsx - THE "< Page Title" BACK LINK AT THE TOP OF A FORM PAGE
// ============================================================

import { Link } from "react-router";
import arrow from "../assets/eva_arrow-ios-back-fill.png";

const PageHeader = ({ title }: { title: string }) => {
  return (
    <Link to="/tasks" className="flex items-center gap-2">
      <img src={arrow} alt="back" />
      <h1 className="text-[#292929] font-medium text-3xl md:text-[50px]">{title}</h1>
    </Link>
  );
};

export default PageHeader;
