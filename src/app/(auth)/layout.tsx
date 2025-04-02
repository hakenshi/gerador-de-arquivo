export default function LayoutLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-[100dv] h-[100dvh] bg-zinc-800 grid place-items-center">
            {children}
        </main>
    )
}
