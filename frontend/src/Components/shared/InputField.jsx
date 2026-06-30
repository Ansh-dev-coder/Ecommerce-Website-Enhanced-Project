const InputField=({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder
})=>{
    const hasError = errors?.[id]?.message;

    return (
        <div className="min-w-0">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                type={type}
                id={id}
                value={value}
                placeholder={placeholder}
                className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${hasError ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100" : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`}
                {...register(id,{
                required : {value : required,message},
                minLength : min ?{
                    value:min,message: `Minimum ${min} character is required`} 
                    : null,
                pattern : 
                   type==="email" 
                   ?{
                    value : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message : "Please enter a valid email"
                   } 
                   : type==="url"
                   ?{
                    value :/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
                    message : "Please enter a valid url"
                   } : null,
            })}/>
            {errors[id]?.message && (
                <p className="mt-1 text-xs text-red-600 break-words">
                    {errors[id]?.message}
                </p>
            )}
        </div>
    )
}
export default InputField