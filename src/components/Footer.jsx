// Mendefinisikan komponen `Footer`
export default function Footer() {
    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            {/* Membuat div dengan latar belakang abu-abu gelap dan teks abu-abu terang */}
            <div className="bg-neutral-900 min-h-fit pb-5 text-neutral-300">
                {/* Membuat footer dengan layout grid 2 kolom */}
                <footer className="grid grid-cols-2">
                    {/* Membuat div untuk kontak person dengan border kanan */}
                    <div className="w-11/12 mx-auto border-r border-solid border-neutral-500 mt-10">
                        <h1 className="text-xl ">Contact Person</h1>
                        {/* Membuat grid 2 kolom untuk daftar kontak person */}
                        <div className="grid grid-cols-2 gap-4 w-4/6 my-5">
                            <p>Ryan Dylan: +62 6969666420</p>
                            <p>Ryan Dylan: +62 6969666420</p>
                            <p>Ryan Dylan: +62 6969666420</p>
                        </div>
                        {/* Membuat copyright */}
                        <h1 className="font-bold">
                            2023 &copy; BUNKASAI ISTTS
                        </h1>
                    </div>
                    {/* Membuat div untuk informasi lainnya */}
                    <div className="w-11/12 mx-auto border-neutral-500 mt-10 grid grid-cols-2">
                        {/* Membuat link ke Instagram */}
                        <div className="">
                            <a
                                href="https://instagram.com/bunkasaiistts"
                                className="flex items-center"
                                target="_blank"
                            >
                                <img
                                    src="/instagram-logo.png"
                                    alt=""
                                    className="w-5 h-5 brightness-75"
                                />
                                <p className="mx-2">@bunkasaiistts</p>
                            </a>
                        </div>
                        {/* Membuat informasi kontak dan link ke halaman feedback */}
                        <div className="text-right">
                            <p className="mb-5">
                                Jl. Ngagel Jaya Tengah No.73-77 · 0821-2290-7788
                            </p>
                            <p className="mb-5">
                                Surabaya, Jawa Timur, Indonesia
                            </p>
                            <a href="">
                                <p className="mt-14">Feedback</p>
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
