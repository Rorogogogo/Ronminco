import Header from "@/app/components/ui/curved-menu";

const DemoPage = () => {
  const navItems = [
    { heading: "Home", href: "/" },
    { heading: "About us", href: "/#aboutus" },
    { heading: "Services", href: "/#services" },
    { heading: "Work", href: "/#work" },
    { heading: "Team", href: "/#team" },
    { heading: "Pricing", href: "/#pricing" },
    { heading: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header navItems={navItems} />

      <div className="text-white h-screen text-7xl text-center flex justify-center items-center">
        hello<span className="italic">!</span>
      </div>
    </div>
  );
};

export default DemoPage;
