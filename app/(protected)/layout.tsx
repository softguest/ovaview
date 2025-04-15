import { Card } from "@/components/ui/card";
import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
    <div className='bg-slate-100 grid grid-cols-1 min-h-full px-4 py-8 md:px-32'> 
      <Card className='p-8'> 
        {children}
      </Card>
    </div>
   );
}
 
export default ProtectedLayout;