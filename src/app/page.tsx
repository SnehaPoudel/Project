"use client";
import Button from "@/components/Buttons";
import ExchangeIcon from "@/components/Icons/ExchangeIcon";
import PlusIcon from "@/components/Icons/PlusIcon";
import PrimaryIcon from "@/components/Icons/PrimaryIcon";
import SecondaryIcon from "@/components/Icons/SecondaryIcon";
import SubscribeModal from "@/components/SubscribeModal";


export default function Home() {
  
  const handleClick = (message: string) => {
    alert(message);
  };

  return (
    <div>
      <SubscribeModal />
    </div>

    // <div className="flex items-center justify-center h-screen bg-gray-100">
    //   <div className="flex flex-col gap-4 p-6 bg-white border rounded-lg shadow-lg w-[800px]">
    //     <h1 className="text-4xl font-bold mb-6">Quick Actions</h1>
    //     <div className="flex gap-4">
    //       <Button handleClick={() => handleClick("Primary Button Clicked")} variant="primary" customIcon={<PrimaryIcon />}>
    //         Make Payments
    //       </Button>
    //       <Button handleClick={() => handleClick("Secondary Button Clicked")} variant="secondary" customIcon={<SecondaryIcon/>}>
    //         View Rates
    //       </Button>
    //       <Button handleClick={() => handleClick("Outline Button Clicked")} variant="outline" customIcon={<ExchangeIcon />}>
    //         Exchange Currency
    //       </Button>
    //       <Button handleClick={() => handleClick("Secondary Button Clicked")} variant="secondary" customIcon={<PlusIcon />}>
    //         New recipent
    //       </Button>
    //     </div>
    //     {/* <Button 
    //         handleClick={() => handleClick("Full Width Button Clicked")} 
    //         variant="fullWidth" 
    //       >
    //         Continue with Email
    //       </Button> */}
    //     <div className="flex gap-4 justify-center w-full">
    //       <Button 
    //         handleClick={() => handleClick("Text Button Clicked")} 
    //         variant="text" 
    //       >
    //         Forgot Password?
    //       </Button>
    //       <Button 
    //         handleClick={() => handleClick("Full Width Button Clicked")} 
    //         variant="fullWidth" 

    //       >
    //         Continue with Email
    //       </Button>
    //     </div>
    //   </div>
    // </div>

  );
}

