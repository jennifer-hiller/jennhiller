<script setup lang="ts">
import { db } from "@/firebase";
import { marked } from "marked";
import {
  type DocumentData,
  doc,
  getDoc,
  DocumentSnapshot,
} from "firebase/firestore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
async function fetchData() {
  try {
    const id = useRoute().params.id as string;
    const docRef = doc(db, "blog", id);
    const docSnap = await getDoc(docRef);
    blogEntry = docSnap;
  } catch (e) {
    console.error(e);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
}
const isLoading = ref(true);
const hasError = ref(false);
let blogEntry: DocumentSnapshot<DocumentData>;

onMounted(() => {
  fetchData();
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
          <article class="blog__entry" v-if="blogEntry">
            <h3 class="blog__entry__title">
              <a :href="`/blog/${blogEntry.id}`">{{
                blogEntry.data()!.title
              }}</a>
            </h3>
            <h4 class="blog__entry__date">
              {{
                new Date(
                  blogEntry.data()!.date.seconds * 1000
                ).toLocaleDateString()
              }}
            </h4>
            <div
              class="blog__entry__contents"
              v-html="marked.parse(blogEntry.data()!.contents)"
            ></div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
