import router from "next/router";
import { db, timestamp } from "../firebase";

const handleTargetPost = (id) => {
  router.push("/post/" + id);
};

const handleIdDelete = async (collection, id, postId) => {
  db.collection(collection).doc(id).delete();

  const postIdRef = db.collection("posts");
  const snapshot = await postIdRef.doc(postId).get();
  if (snapshot.exists) {
    postIdRef.doc(postId).update({
      commentsAmount: snapshot.data().commentsAmount - 1,
    });
  }
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

  const userBookmarkedRef = db.collection("posts");
  const snapshot = await userBookmarkedRef.doc(postId).get();

  if (snapshot.data().bookmarked.includes(session.user.email)) {
    userBookmarkedRef.doc(postId).update({
      bookmarked: snapshot
        .data()
        .bookmarked.filter((email) => email !== session.user.email),
    });
  } else {
    userBookmarkedRef.doc(postId).update({
      bookmarked: snapshot.data().bookmarked.concat([session.user.email]),
    });
  }
};

export { handleTargetPost, handleIdDelete, handlePostBookmark };
