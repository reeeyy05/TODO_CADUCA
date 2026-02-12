import RegistroForm from "../components/forms/RegistroForm";

export default function RegisterPage() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Registro de Usuario</h2>
                <RegistroForm />
            </div>
        </section>)
}