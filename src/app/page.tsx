import Button from "@/components/Buttons";


export default function Home() {
  
  const handleClick = (message: string) => {
    alert(message);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Button onClick={() => handleClick("Primary Button Clicked")} variant="primary">
        Primary
      </Button>
      <Button onClick={() => handleClick("Secondary Button Clicked")} variant="secondary">
        Secondary
      </Button>
      <Button onClick={() => handleClick("Outline Button Clicked")} variant="outline">
        Outline
      </Button>
    </div>
  );
}
