import Button from "@/components/Buttons";


export default function Home() {
  // Handle button click events
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
      <Button onClick={() => handleClick("Danger Button Clicked")} variant="danger">
        Danger
      </Button>
      <Button onClick={() => handleClick("Disabled Button Clicked")} disabled>
        Disabled
      </Button>
    </div>
  );
}
