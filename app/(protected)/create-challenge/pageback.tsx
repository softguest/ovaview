import { redirect } from "next/navigation";

// import { getCurrentUser } from "@/lib/session";
import Modal from "@/components/modal/Modal";
import ProjectForm from "@/components/ChallengeForm";
import { currentUser } from "@/lib/auth";
import { Card } from "@/components/ui/card";

const CreateProject = async () => {
  const session = await currentUser();

  if (!session?.email) redirect("/")

  return (
    <div className='bg-slate-100 px-4 grid grid-cols-1 min-h-full py-8 lg:px-8 xl:px-32'>
        <Card className='p-4 md:p-8'>
          <div>
            <h3 className="modal-head-text text-1xl text-sky-600">Create a New Project</h3>
            <ProjectForm type="create" session={session} />
          </div>
        </Card>
    </div>
  );
};

export default CreateProject;
