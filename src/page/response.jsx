import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentDetails = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Supabase instance from your Api hook
  const location = useLocation();

  // Obtén la referencia del query string
  const queryParams = new URLSearchParams(location.search);
  const refPayco = queryParams.get("ref_payco");

  useEffect(() => {
    if (refPayco) {
      const fetchPaymentDetails = async () => {
        try {
          const response = await fetch(
            `https://secure.epayco.co/validation/v1/reference/${refPayco}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();

          // Verificar si la respuesta contiene los datos esperados
          if (data.success && data.data) {
            setPaymentDetails(data.data);
            // Solo guarda los detalles si la respuesta es "Aceptada"

            if (data.data.x_respuesta === "Aceptada") {
              //await savePaymentDetails(data.data); // Guarda los detalles en la base de datos
              alert("Pago exitoso");
            }
          } else {
            setError("No se encontraron detalles para esta referencia.");
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPaymentDetails();
    } else {
      setError("Referencia de pago no proporcionada");
      setLoading(false);
    }
  }, [refPayco]); // Agrega `nombreSorteo` a las dependencias

  if (loading)
    return <p className="w-full text-center items-center">Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const formattedAmount = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(paymentDetails.x_amount);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <main className="w-full relative top-20">
        {paymentDetails && (
          <>
            <section className="w-full justify-center items-center flex flex-col gap-2 mt-5">
              <h2 className="font-raleway-black text-2xl">Estado del Pago</h2>
              <p
                style={{
                  backgroundColor:
                    paymentDetails.x_respuesta === "Aceptada" ? "green" : "red",
                }}
                className="p-2 rounded-lg px-3 text-white"
              >
                {paymentDetails.x_respuesta}
              </p>
            </section>
            <section className="w-full justify-center items-center flex flex-col gap-2 mt-5">
              <article className="w-[95%] md:w-[40%] border-2 border-black bg-transparent  rounded-lg p-3 flex flex-col  justify-center items-center mb-20">
                <div className="flex flex-col justify-start items-start gap-2 w-full ">
                  <p className="font-raleway-regular">
                    Detalles del Pago:{" "}
                    <span className="font-raleway-black ">{refPayco}</span>
                  </p>
                  <p className="font-raleway-regular">
                    ID de Transacción:{" "}
                    <span className="font-raleway-black">
                      {" "}
                      {paymentDetails.x_transaction_id}
                    </span>{" "}
                  </p>
                  <p className="font-raleway-regular">
                    Fecha:
                    <span className="font-raleway-black">
                      {paymentDetails.x_fecha_transaccion}
                    </span>
                  </p>
                  <p className="font-raleway-regular">
                    Estado:
                    <span
                      style={{
                        backgroundColor:
                          paymentDetails.x_respuesta === "Aceptada"
                            ? "green"
                            : "red",
                      }}
                      className="p-1 rounded-lg px-3 text-white ml-2"
                    >
                      {paymentDetails.x_respuesta}
                    </span>
                  </p>

                  <p className="font-raleway-regular">
                    Nombre del Sorteo:
                    <span className="font-raleway-black ml-2 ">
                      {paymentDetails.x_extra1}
                    </span>
                  </p>

                  <p className="font-raleway-regular">
                    Monto:
                    <span className="font-raleway-black ml-2 ">
                      {formattedAmount} COP
                    </span>
                  </p>
                  <p className="font-raleway-regular">
                    Descripción:
                    <span className="font-raleway-regular ml-2">
                      Tus numeros{" "}
                    </span>
                    <span className="ml-2 border-2 border-green-400 bg-transparent p-1 px-2  rounded-lg font-raleway-black">
                      {paymentDetails.x_description}
                    </span>
                  </p>
                  <p className="font-raleway-regular">
                    Nombre del Banco:
                    <span className="font-raleway-black ml-2">
                      {paymentDetails.x_bank_name}
                    </span>
                  </p>
                  <p className="font-raleway-regular">
                    Código de Aprobación:
                    <span className="font-raleway-black ml-2">
                      {paymentDetails.x_approval_code}
                    </span>
                  </p>
                  <p className="font-raleway-regular">
                    Tarjeta:
                    <span className="font-raleway-black ml-2">
                      {paymentDetails.x_cardnumber}
                    </span>
                  </p>
                  <p className="font-raleway-regular">
                    Codigo de asesor:
                    <span className="font-raleway-black ml-2">
                      {paymentDetails.x_extra4}{" "}
                    </span>
                  </p>
                  <p className="font-raleway-regular">
                    Email del Cliente:
                    <span className="font-raleway-black ml-2">
                      {paymentDetails.x_customer_email}
                    </span>
                  </p>
                  <section className="w-full mt-5 ">
                    <p>
                      {" "}
                      <span className="font-raleway-black">Nota: </span>Este
                      pago fue procesado por Epayco. Al correo{" "}
                      <span className="font-raleway-black">
                        {" "}
                        {paymentDetails.x_customer_email}
                      </span>{" "}
                      se mando la información de la transacción.
                    </p>
                  </section>

                  {paymentDetails.x_respuesta !== "Aceptada" && (
                    <section className="w-full mt-5 border-2 border-red-500 bg-transparent rounded-lg p-3 flex flex-col justify-center items-center">
                      <p className="w-full">
                        Si el estado de la transacción es Pendiende. Copia su
                        Referencia de pago:{" "}
                        <span className="font-raleway-black">{refPayco}</span> y
                        valida su compra en el sitio{" "}
                        <a
                          href="https://www.epayco.co/es/compra/validar-compra"
                          target="_blank"
                          rel="noreferrer"
                          className="font-raleway-black text-sm"
                        >
                          https://www.epayco.co/es/compra/validar-compra
                        </a>
                        . si la transacción fue cancelada, vuelve a intentarlo.
                      </p>
                    </section>
                  )}
                  <section className="print:hidden w-full flex justify-end items-end">
                    <button
                      onClick={handlePrint}
                      className="mt-4 p-2 bg-[#2E3844] text-white rounded-lg"
                    >
                      Imprimir
                    </button>
                  </section>
                </div>
              </article>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default PaymentDetails;
