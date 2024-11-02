import { Head } from '@inertiajs/react';
import Layout from '../../Layout/Layout';

export default function Home() {
    return (
        <Layout>
            <Head title="Home" />
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
                <p>I Learn about Inertia Laravel React in here!.</p>
            </div>
        </Layout>
    );
}
