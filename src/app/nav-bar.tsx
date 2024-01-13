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
          <Link href="/profile/carltonj2000">User Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
