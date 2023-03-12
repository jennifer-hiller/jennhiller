<script setup lang="ts">
import { db } from "@/firebase";
import {
  query,
  collection,
  orderBy,
  getDocs,
  QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { onMounted, ref } from "vue";
async function fetchData() {
  try {
    const q = query(collection(db, "blog"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      blogEntries.push(doc);
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
let blogEntries: QueryDocumentSnapshot<DocumentData>[] = [];

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
          <article v-for="doc in blogEntries" :key="doc.id" class="blog__entry">
            <h3 class="blog__entry__title">
              <a :href="`/blog/${doc.id}`">{{ doc.data().title }}</a>
            </h3>
            <h4 class="blog__entry__date">
              {{
                new Date(doc.data().date.seconds * 1000).toLocaleDateString()
              }}
            </h4>
            <p class="blog__entry__contents">{{ doc.data().contents }}</p>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
