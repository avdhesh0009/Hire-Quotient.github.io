import { FaEdit } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import Data from  '../Data/Data.json'

export default function Home(){
    return(
        <>
          <section class="mx-auto w-full max-w-7xl px-4 py-4">
            <div className="flex justify-between pt-4">
                <input type="text" placeholder="Enter Value..." style={{all:"unset",border:"0.1rem solid lightgray",borderRadius:"0.3rem",padding:"0.3rem",width:"18rem"}}></input>
                <RiDeleteBin7Line className="bg-red-400 text-white text-4xl p-2 rounded-md cursor-pointer"/>
            </div>
            <div class="mt-6 flex flex-col">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden border border-gray-200 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                class="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                >
                                <span>
                                    <input type="checkbox"></input>
                                </span>
                                <span class="ml-4"></span>
                                <span>Name</span>
                                </th>
                                <th
                                scope="col"
                                class="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                                >
                                Email
                                </th>
                                <th
                                scope="col"
                                class="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                >
                                Role
                                </th>
                                <th
                                scope="col"
                                class="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                >
                                Actions
                                </th>
                                <th scope="col" class="relative px-4 py-3.5">
                            </th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                        {Data.map((d, i) => (
                            <tr key={i}>
                                <td class="whitespace-nowrap px-4 py-4">
                                    <div class="flex items-center">
                                        <div>
                                            <input type="checkbox" />
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">
                                                {d.name} {/* Assuming you meant to use d.name instead of name */}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap px-12 py-4">
                                    <div class="text-sm font-medium text-gray-900">{d.email}</div>
                                </td>
                                <td class="whitespace-nowrap px-4 py-4">
                                    <span class="inline-flex px-2 text-sm font-medium text-gray-900 leading-5">
                                        member
                                    </span>
                                </td>
                                <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                    <div className="flex gap-2">
                                        <div className="border-2 p-2 rounded-md"><FaEdit/></div>
                                        <div className="border-2 p-2 rounded-md text-red-500"><RiDeleteBin7Line /></div>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                                </td>
                            </tr>
                        ))}
                     </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </>
    )
}

<script src="https://kit.fontawesome.com/07fe73c71d.js" crossorigin="anonymous"></script>