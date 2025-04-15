// import { db } from '@/lib/db';
// import { useCurrentUser } from '@/hooks/use-current-user';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// const AccountApplications = async ({params}) => {
//     // const user = useCurrentUser();
  
//     const studentApplications = await db?.studentApplication.findMany({
//       where: {
//         //   authorId: user?.id
//              id : params.id,
//       },
//       include: {
//           author: true,
//           registration: true,
//       }
//   });
//   return (
//     <div className='py-8'>
//         <h2 className='text-3xl font-bold'>Students Requesting Admission.</h2>
//         <hr className="my-4"/>
//         <div className="relative overflow-x-auto rounded-md">
//             <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                     <tr>
//                         <th scope="col" className="px-6 py-3">
//                             Student Name
//                         </th>
//                         <th scope="col" className="px-6 py-3">
//                             Program
//                         </th>
//                         <th scope="col" className="px-6 py-3">
//                             Category
//                         </th>
//                         <th scope="col" className="px-6 py-3">
//                             Session
//                         </th>
//                         <th scope="col" className="px-6 py-3">
//                             Details 
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                 {studentApplications.map((studentApplication) => (
//                     <tr key={studentApplication.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                         <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                             {studentApplication.author?.firstName}
//                         </th>
//                         <td className="px-6 py-4">
//                             {studentApplication.className}
//                         </td>
//                         <td className="px-6 py-4">
//                             {studentApplication.programmeOfStudy}
//                         </td>
//                         <td className="px-6 py-4">
//                             {studentApplication.registration?.title}
//                         </td>
//                         <td className="px-6 py-4">
//                             <Link key={studentApplication.id} href={`/studentApplications/${studentApplication.id}`}>
//                                 <Button>Details</Button>
//                             </Link>
//                         </td>
//                     </tr>
//                     )) }
//                 </tbody>
//             </table>
//         </div>
//     </div>
//   )
// }

// export default AccountApplications