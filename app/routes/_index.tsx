import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "~/prisma.server";

export const loader = async (c: LoaderFunctionArgs) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return {
    posts,
  };
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="p-12 flex flex-col gap-4">
        {loaderData.posts.map((post) => {
          return (
            <div key={post.id}>
              <Link to={`/posts/${post.id}`} className="text-xl">
                {post.title}
              </Link>
              <div className="text-sm text-gray-400">
                {new Date(post.created_at).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
