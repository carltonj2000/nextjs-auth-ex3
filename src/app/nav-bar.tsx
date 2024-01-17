import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full">
      <ul className="flex justify-between items-center max-w-lg m-auto">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/create-post">Create Post</Link>
        </li>
        <li>
          <Link href="/me">User Profile</Link>
        </li>
        <li>
          <Link href="/api/auth/signin?callbackUrl=/">Login</Link>
        </li>
        <li>
          <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
