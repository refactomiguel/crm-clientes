import  { useLoaderData, Form, useActionData, useNavigate, redirect } from "react-router-dom"
import { getCliente, updateClient } from "../services/clientes";
import Formulario from "../components/Formulario";
import Error from "../components/Error";

export async function loader({ params }) {
  const cliente = await getCliente(params.id);

  if (Object.values(cliente).length === 0) {
    throw new Response('', { status: 404, statusText: `No se enconntró el cliente indicado (id: ${params.id})`})
  }
  return cliente
}

export async function action({request, params}) {

  const formData = await request.formData()
  const data = Object.fromEntries(formData);

  const email = formData.get('email')

  const errores = []

  const vData = Object.values(data)
  vData.pop() // Ignorar la validación del último campo (textarea notas)

  if (vData.includes('')) {
    errores.push('Todos los campos son obligatorios')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])");

  if (!regex.test(email)) {
    errores.push('El email no es válido')
  }

  if (Object.keys(errores).length) {
    return errores
  }

  await updateClient(params.id, data)

  return redirect('/')
}


const EditarCliente = () => {

  const cliente = useLoaderData()
  const navigate = useNavigate()
  const actionData = useActionData()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Modifica los datos de un cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={ () => navigate(-1) }
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

        {actionData?.length && actionData.map( (error, i) => <Error key={i}>{error}</Error>)}

        <Form method="POST" noValidate>
          <Formulario cliente={cliente}/>
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Actualizar Cliente"
          />
        </Form>
      </div>
    </>
  )
}

export default EditarCliente
