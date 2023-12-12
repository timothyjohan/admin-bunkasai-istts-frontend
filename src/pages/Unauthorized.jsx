export default function Unauthorized(){
    return(
        <>
            <div className="min-h-screen min-w-screen flex justify-center items-center text-neutral-200 text-center">
                <div>
                    <h1 className="font-bold text-6xl">401 - UNAUTHORIZED ACCESS</h1>
                    <br />
                    <h1 className="font-bold text-2xl">You don't have permission to access this dirrectory page</h1>
                    <br />
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                        <button className="bg-neutral-800 text-xl py-2 px-10 rounded-lg">Back</button>

                    </a>

                </div>

            </div>
        </>
    )
}