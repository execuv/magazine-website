import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAllArticles } from "../firestore";

export async function getBlogById(id: string) {
  try {
    const blogRef = doc(db, "articles", id);
    const blogSnap = await getDoc(blogRef);

    if (!blogSnap.exists()) {
      throw new Error("Blog not found");
    }

    // Get related blogs from the same category
    const allArticles = await getAllArticles();
    const currentBlog:any = { id: blogSnap.id, ...blogSnap.data() };

    // Filter related blogs (same category, excluding current blog)
    const relatedBlogs = allArticles
      .filter(
        (article: any) =>
          article.category === currentBlog.category &&
          article.id !== currentBlog.id
      )
      .slice(0, 3); // Get only 3 related blogs

    return {
      blog: currentBlog,
      relatedBlogs,
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
}
