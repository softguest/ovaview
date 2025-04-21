import { Card } from "@/components/ui/card";
import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
    <div className='bg-slate-100 grid grid-cols-1 px-4 py-8 md:px-32'> 
      <Card className='p-2 rounded-md'> 
        {children}
      </Card>
    </div>
   );
}
 
export default ProtectedLayout;