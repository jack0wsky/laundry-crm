import Image from "next/image";

export const AbstractBackground = () => {
  return (
    <div className="w-full h-[180px] absolute right-0 z-[-1]">
      <div className="w-full h-full relative">
        <Image src="/background.png" width={1500} height={180} alt="abstract blue background" />
      </div>
    </div>
  );
};
