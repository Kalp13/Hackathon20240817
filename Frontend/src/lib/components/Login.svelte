<script>
    import { goto } from "$app/navigation";
    import userService from "$lib/services/userService";

    let username = "";
    let password = "";

    async function login(){
        console.log('hi');
        var loginResponse = await userService.login(username, password);

        if(loginResponse?.userId){
            goto('/product')
        }
    }
</script>

<div >
    <div class="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
        <form class="flex flex-col">
            <div class="pb-2">
                <label for="email" class="block mb-2 text-sm font-medium text-[#111827]">Username</label>
                <div class="relative text-gray-400"><span class="absolute inset-y-0 left-0 flex items-center p-1 pl-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg></span> 
                    <input bind:value={username} type="email" name="email" id="email" class="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="Username" autocomplete="off">
                    <div data-lastpass-icon-root=""></div>
                </div>
            </div>
            <div class="pb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-[#111827]">Password</label>
                <div class="relative text-gray-400"><span class="absolute inset-y-0 left-0 flex items-center p-1 pl-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-asterisk"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M12 8v8"></path><path d="m8.5 14 7-4"></path><path d="m8.5 10 7 4"></path></svg></span> 
                    <input bind:value={password} type="password" name="password" id="password" placeholder="••••••••••" class="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autocomplete="new-password">
                    <div data-lastpass-icon-root=""></div>
                </div>
            </div>
            <button type="submit" on:click={login} class="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">Login</button>
            
        </form>
    </div>
</div>

<style>
.loginForm{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.loginForm input{
    margin: 15px;
}
</style>