<script setup lang="ts">
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "@/firebase";
import { marked } from "marked";
import {
  query,
  collection,
  orderBy,
  getDocs,
  QueryDocumentSnapshot,
  type DocumentData,
  doc,
  setDoc,
} from "firebase/firestore";
import { onMounted, ref } from "vue";
async function fetchData() {
  try {
    const q = query(collection(db, "blog"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      blogEntries.value.push(doc);
    });
  } catch (e) {
    console.error(e);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
}
const isLoading = ref(true);
const hasError = ref(false);
const editDoc = ref<string | null>(null);
const isAdmin = ref(false);
let blogEntries = ref<QueryDocumentSnapshot<DocumentData>[]>([]);
function edit(id: string) {
  editDoc.value = id;
}
function submitHandler(e: Event) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const id = form.dataset.key!;
  const formData = new FormData(form);
  const formObject: { [key: string]: string | Date } = {};
  for (let [key, value] of formData.entries()) {
    formObject[key] = value as string;
  }
  try {
    const docRef = doc(db, "blog", id);
    setDoc(docRef, formObject, { merge: true });
    console.log("Document written with ID: ", docRef.id);
    editDoc.value = null;
    blogEntries.value = [];
    setTimeout(() => {
      fetchData();
    }, 1000);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}
function cancel() {
  editDoc.value = null;
}
onMounted(() => {
  fetchData();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      user.getIdTokenResult().then((idTokenResult) => {
        isAdmin.value = idTokenResult.claims.role === "admin";
      });
    } else {
      isAdmin.value = false;
    }
  });
});
</script>
<template>
  <main>
    <section class="splash">
      <h1>Blog</h1>
    </section>
    <section class="contents">
      <p v-if="isLoading">Loading...</p>
      <div v-else>
        <p v-if="hasError">Error retrieving blog entries</p>
        <div class="blog" v-else>
          <article
            v-for="doc in blogEntries"
            :key="doc.id"
            class="blog__entry"
            :data-key="doc.id"
          >
            <form
              v-if="editDoc === doc.id"
              @submit="submitHandler"
              class="blog__form"
              :data-key="doc.id"
            >
              <p>
                <label for="title">Title</label>
                <input
                  type="text"
                  name="title"
                  class="blog__form-title"
                  id="title"
                  :value="doc.data().title"
                />
              </p>
              <p>
                <label for="contents">Contents</label>
                <textarea
                  name="contents"
                  class="blog__form-contents"
                  id="contents"
                  v-model="doc.data().contents"
                ></textarea>
              </p>
              <p>
                <button>Submit</button>
                <button type="button" @click="cancel">Cancel</button>
              </p>
            </form>
            <div v-else>
              <h3 class="blog__entry__title">
                <a :href="`/blog/${doc.id}`">{{ doc.data().title }}</a>
                <button
                  v-if="isAdmin"
                  type="button"
                  @click="() => edit(doc.id)"
                >
                  Edit
                </button>
              </h3>
              <h4 class="blog__entry__date">
                {{
                  new Date(doc.data().date.seconds * 1000).toLocaleDateString()
                }}
              </h4>
              <div
                class="blog__entry__contents"
                v-html="marked.parse(doc.data().contents)"
              ></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
