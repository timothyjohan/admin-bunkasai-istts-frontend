export default function Tenants(){
    return(
        <>
            <div className="min-h-screen min-w-screen flex items-center justify-center text-neutral-200">
                <div className="bg-neutral-800 p-10 bg-opacity-75 rounded-xl">
                    <table className="border-collapse border border-neutral-300 text-center text-lg">
                        <thead>
                            <tr>
                                <th className="border border-neutral-300 px-5">Nama Tenant</th>
                                <th className="border border-neutral-300 px-5">Nama Contact Person</th>
                                <th className="border border-neutral-300 px-5">No Telp</th>
                                <th className="border border-neutral-300 px-5">Alamat</th>
                                <th className="border border-neutral-300 px-5">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border border-neutral-300">
                                <td className="border border-neutral-300 px-5">dummy 1 tenant</td>
                                <td className="border border-neutral-300 px-5">dummy1</td>
                                <td className="border border-neutral-300 px-5">0812931212</td>
                                <td className="border border-neutral-300 px-5">jl. jalan dari dulu nugas kapan</td>
                                <td className="border border-neutral-300 px-5">false</td>
                            </tr>

                            <tr className="border border-neutral-300">
                                <td className="border border-neutral-300 px-5">dummy 2 tenant</td>
                                <td className="border border-neutral-300 px-5">dummy2</td>
                                <td className="border border-neutral-300 px-5">0812931212</td>
                                <td className="border border-neutral-300 px-5">jl. jalan jalan jalan</td>
                                <td className="border border-neutral-300 px-5">false</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}