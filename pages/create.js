import { useState } from "react";
import { useRouter } from 'next/router';
import PageLayout from "../components/PageLayout";

export default function Create() {
    const router = useRouter();

    //state management:
    const [title, setTitle] = useState("");
    const [content, setcontent] = useState("");

    //form submit action
    const submitData = async function (e) {
        e.preventDefault();
        try {
            const body = { title, content };
            await fetch("/api/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(body)
            });
            await router.push("/")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <PageLayout>
            <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create a Review</h1>
                <form onSubmit={submitData}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Title"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                        <textarea
                            id="content"
                            rows="4"
                            placeholder="Write your review here!"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                            onChange={(e) => setcontent(e.target.value)}
                            value={content}
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            value="Create"
                            disabled={!content || !title}
                        >
                            Create
                        </button>
                        <a
                            href="#"
                            onClick={() => router.push("/")}
                            className="text-sm text-indigo-600 hover:text-indigo-500"
                        >
                            or Cancel
                        </a>
                    </div>
                </form>
            </div>
        </PageLayout>
    );
}
