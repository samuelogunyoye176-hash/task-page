// ============================================================
// CoverPage.tsx - THE LANDING PAGE  (URL: /)
// Just text, an image and a link to the task list. No data loading.
// ============================================================

import { Link } from "react-router";
import heroImage from "../assets/carro-one.png";

const CoverPage = () => {
  return (
    <main className="max-w-360 mx-auto px-5 md:px-42.5 pt-10 md:pt-16.25 flex flex-col md:flex-row items-center gap-8 md:gap-0 md:justify-between">
      <div className="flex flex-col items-start text-start gap-5 max-w-133.75">
        <h1 className="font-medium text-3xl md:text-[50px] leading-tight text-[#292929]">
          Manage your Tasks on <span className="text-[#974FD0]">TaskDuty</span>
        </h1>
        <p className="text-lg md:text-[24px] font-normal leading-tight text-[#737171]">
          Write down what you need to do, tag it as Urgent or Important, and
          remove it when it is done. Simple task management that keeps you
          focused.
        </p>
        <Link
          to="/tasks"
          className="w-48 h-12 flex items-center justify-center rounded-lg bg-[#974FD0] text-[#FAF9FB] text-xl md:text-[24px] font-medium"
        >
          Go to My Tasks
        </Link>
      </div>
      <img
        src={heroImage}
        alt="tasks illustration"
        className="w-full max-w-md"
      />
    </main>
  );
};

export default CoverPage;
