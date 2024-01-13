export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <main className="text-center mt-10">
      <h1>Post {params.id}</h1>
      <p>TODO: display post</p>
    </main>
  );
}
