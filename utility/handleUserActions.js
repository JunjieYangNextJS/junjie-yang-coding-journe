import router from "next/router";
import { db, timestamp } from "../firebase";

const handleTargetPost = (id) => {
  router.push("/post/" + id);
};

const handleIdDelete = (collection, id) => {
  db.collection(collection).doc(id).delete();

  // db.collection("posts")
  //   .doc(postId)
  //   .update({
  //     commentsAmount: commentsAmount - 1,
  //   });
};

const handlePostBookmark = async (postId, data, session) => {
  const bookmarkRef = db.collection("bookmarks");
  const docs = await bookmarkRef
    .where("bookmarkedId", "==", postId)
    .where("readerEmail", "==", session.user.email)
    .get();

  if (docs.empty) {
    db.collection("bookmarks").add({
      readerEmail: session.user.email,
      text: data.text,
      images: data.images,
      posterEmail: data.posterEmail,
      posterName: data.posterName,
      posterIcon: data.posterIcon,
      bookmarkedId: postId,
      timestamp,
    });
  } else {
    docs.forEach((doc) => {
      doc.ref.delete();
    });
  }
};

export { handleTargetPost, handleIdDelete, handlePostBookmark };
