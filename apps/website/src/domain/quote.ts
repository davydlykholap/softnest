// Submission transport is separate from the form so lead storage can be introduced later.
export async function submitQuote(formData:FormData,signal:AbortSignal) {
 const response=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{Accept:'application/json'},body:formData,credentials:'omit',referrerPolicy:'strict-origin-when-cross-origin',signal});
 const result=await response.json() as {success?:boolean};
 if(!response.ok||!result.success)throw new Error('Quote submission failed');
}
