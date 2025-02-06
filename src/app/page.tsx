"use client";
import Button from "@/components/Buttons";
import ExchangeIcon from "@/components/Icons/ExchangeIcon";
import PlusIcon from "@/components/Icons/PlusIcon";
import PrimaryIcon from "@/components/Icons/PrimaryIcon";
import SecondaryIcon from "@/components/Icons/SecondaryIcon";


export default function Home() {
  
  const handleClick = (message: string) => {
    alert(message);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-4xl font-bold mb-6">Buttons</h1>
      <div className="flex gap-4">
        <Button handleClick={() => handleClick("Primary Button Clicked")} variant="primary" customIcon={<PrimaryIcon />}>
          Make Payments
        </Button>
        <Button handleClick={() => handleClick("Secondary Button Clicked")} variant="secondary" customIcon={<SecondaryIcon/>}>
          View Rates
        </Button>
        <Button handleClick={() => handleClick("Outline Button Clicked")} variant="outline" customIcon={<ExchangeIcon />}>
          Exchange Currency
        </Button>
        <Button handleClick={() => handleClick("Secondary Button Clicked")} variant="secondary" customIcon={<PlusIcon />}>
          New recipent
        </Button>

      </div>
      <Button 
          handleClick={() => handleClick("Full Width Button Clicked")} 
          variant="fullWidth" 
          
        >
          Continue with Email
        </Button>
      <div className="flex gap-4">
        <Button 
          handleClick={() => handleClick("Text Button Clicked")} 
          variant="text" 
          
        >
          Forgot Password?
        </Button>
        <Button 
          handleClick={() => handleClick("Full Width Button Clicked")} 
          variant="fullWidth" 
          
        >
          Continue with Email
        </Button>
      </div>

    </div>

  );
}

