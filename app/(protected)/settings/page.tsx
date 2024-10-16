import { auth, signOut } from '@/auth'

const SettingPage = async () => {

    const session = await auth();

    return (
        <div>
            {JSON.stringify(session)}
            <form action={async () => {
                "use server";

                await signOut({ redirectTo: "/", redirect: true });
            }}>
                <button type="submit">
                    Sign Out
                </button>
            </form>
        </div>
    )
}

export default SettingPage;