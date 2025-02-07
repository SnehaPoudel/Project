"use client";

import Button from "./Buttons";
import ImageIcon from "./Icons/ImageIcon";

export default function SubscribeModal() {
    return(
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="relative bg-white border rounded-[14px] shadow-lg h-[359px] w-[648px] bg-cover bg-center"
            style={{
             backgroundImage: "url('/images/background.png')",
            }}
            >
            <div className="w-1/2 h-full flex flex-col justify-content: flex-end; p-6 ml-auto">
                <div className="absolute top-4 right-4">
                    <Button variant="iconbutton" customIcon={<ImageIcon/>} children={undefined}>
                    </Button>
                </div>
                <div className="flex flex-col pr-[17px] gap-[14px] mt-10">
                    
                        <div>
                            <h2 className="text-2xl text-[#232426] font-bold text-[22px]">Subscribe</h2>

                        </div>
                        <div>
                            <p className="text-[#7B828C] font-normal text-[13px] font-normal leading-normal ">
                                Be the first to receive our latest product updates, newest
                                offerings, and free product trials.
                            </p>
                        </div>
                    
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-2 border rounded-[3px] bg-[#D7E0EB] text-[#7B828C] placeholder-gray-500"
                    />
            
                    <Button variant="primary" className="p-6  w-full h-[42px] ">
                            Continue with Email
                    </Button>
                    
                    
                    <div className="text">
                        <p className="text-[11px] text-gray-500">
                            You can learn more about how we handle user data through the  
                            <span className="ml-1">
                                <Button variant="text" className="text-[#52A5FF] font-inter text-[11px] font-normal leading-normal " >
                                    Walcy Privacy Policy.
                                </Button>
                            </span>
                            
                        </p>
                    </div>
                </div>
                
            </div>
             
            </div>
        </div>
    );
}