<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Mail;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

use App\Mail\ContactUsMail;
use App\Mail\CareerMail;
use App\Mail\RequestQuoteMail;
use App\Models\ContactUs;
use App\Models\QuoteRequest;

class UserController extends Controller
{

    public function index()
    {
        $orderColumn = request('order_column', 'created_at');
        if (!in_array($orderColumn, ['id', 'name', 'created_at'])) {
            $orderColumn = 'created_at';
        }
        $orderDirection = request('order_direction', 'desc');
        if (!in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'desc';
        }
        $users = User::when(request('search_id'), function ($query) {
            $query->where('id', request('search_id'));
        })
            ->when(request('search_title'), function ($query) {
                $query->where('name', 'like', '%' . request('search_title') . '%');
            })
            ->when(request('search_global'), function ($query) {
                $query->where(function ($q) {
                    $q->where('id', request('search_global'))
                        ->orWhere('name', 'like', '%' . request('search_global') . '%');
                });
            })
            ->orderBy($orderColumn, $orderDirection)
            ->paginate(50);

        return UserResource::collection($users);
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //
        $this->authorize('user-create');

        $attributes = $request->validate([
            'name' => 'required|string|max:255|min:3',
            'role' => 'required',
            'email' => ['required', 'email', 'unique:users'],
            'password' => 'required',
        ]);

        $user_role = $attributes["role"];

        $created_user = User::create($attributes);

        $created_user->assignRole((int)$user_role);

        return new UserResource($created_user);
    }


    public function show(User $user)
    {
        $this->authorize('user-list');
        return new UserResource($user);
    }


    public function edit(Request $request, $id)
    {
        //

    }


    public function update(Request $request, $id)
    {
        $this->authorize('user-edit');

        $user = User::findOrFail($id);

        $attributes = $request->validate([
            'name' => 'required',
            'role' => 'required',
            'email' => ['required', 'email'],
            // optional password
            'password' => ['nullable', 'min:6'],
        ]);

        $user_role = $attributes["role"];

        $user->update($attributes);

        $user->syncRoles([(int)$user_role]);

        return new UserResource($user);
    }


    public function destroy(User $user)
    {
        $this->authorize('user-delete');
        $user->delete();

        return response()->noContent();
    }




    public function contactUs(Request $request)
    {
        $recaptchaToken = $request->input('recaptchaToken');

        $recaptchaSecret = '6Ldyw1wpAAAAAIvn2LJHPIGK4JsebS2FvVZkN-Pk';
        $recaptchaValueFromClient = $recaptchaToken;

        $recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify?' . http_build_query([
            'secret' => $recaptchaSecret,
            'response' => $recaptchaValueFromClient,
        ]);

        $responseData = json_decode(file_get_contents($recaptchaUrl), true);

        if (!$responseData['success']) {
            return response()->json(['message' => 'reCAPTCHA verification failed', 'status' => 'error']);
        } else {
            $formData = $request->only([
                'request_type',
                'area_of_interest',
                'surname',
                'email',
                'company_name',
                'business_type',
                'country',
                'request',
                'code',
                'firstname',
                'phone_number',
                'accept_terms_conditions'
            ]);

            $formData['message_request'] = $formData['request'];
            unset($formData['request']);

            try {
                // Save the form data to the database
                ContactUs::create($formData);

                // Send the email
                Mail::to('sheffieldafricamarketing@gmail.com')->cc($formData['email'])->send(new ContactUsMail($formData));

                return response()->json(['message' => 'Your message has been received', 'status' => 'success']);
            } catch (\Exception $exception) {
                return response()->json(['message' => $exception->getMessage(), 'status' => 'error']);
            }
        }
    }


    public function careerCv(Request $request)
    {

        $recaptchaToken = $request->input('recaptchaToken');

        $recaptchaSecret = '6Ldyw1wpAAAAAIvn2LJHPIGK4JsebS2FvVZkN-Pk'; // Replace with your actual reCAPTCHA secret key
        $recaptchaValueFromClient = $recaptchaToken; // Replace with the actual reCAPTCHA value from the client

        $recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify?' . http_build_query([
            'secret' => $recaptchaSecret,
            'response' => $recaptchaValueFromClient,
        ]);

        $responseData = json_decode(file_get_contents($recaptchaUrl), true);


        if (!$responseData['success']) {

            return response()->json(['message' => 'reCAPTCHA verification failed', 'status' => 'error']);
        } else {

            $name = $request->input('name');
            $email = $request->input('email');
            $phone_number = $request->input('phone_number');
            $message = $request->input('message');
            $job_title = $request->input('job_title');

            $cvFile = $request->file('cv');
            $supportingDocument = $request->file('supporting_document');


            $formData = [
                'name' => $name,
                'email' => $email,
                'phone_number' => $phone_number,
                'message' => $message,
                'job_title' => $job_title,

                'cv' => [
                    'name' => $cvFile->getClientOriginalName(),
                    'contents' => file_get_contents($cvFile->getRealPath()),
                ],

                'supporting_document' => [
                    'name' => $supportingDocument->getClientOriginalName(),
                    'contents' => file_get_contents($supportingDocument->getRealPath()),
                ],

            ];


            try {

                Mail::to('sheffieldafricamarketing@gmail.com')->cc($email)->send(new CareerMail($formData));

                return response()->json(['message' => 'Your submission has been received', 'status' => 'success']);
            } catch (\Exception $exception) {
                return response()->json(['message' => $exception->getMessage(), 'status' => 'success']);
            }
        }
    }




    public function requestQuote(Request $request)
    {
        $recaptchaToken = $request->input('recaptchaToken');

        $recaptchaSecret = '6Ldyw1wpAAAAAIvn2LJHPIGK4JsebS2FvVZkN-Pk'; // Replace with your actual reCAPTCHA secret key
        $recaptchaValueFromClient = $recaptchaToken; // Replace with the actual reCAPTCHA value from the client

        $recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify?' . http_build_query([
            'secret' => $recaptchaSecret,
            'response' => $recaptchaValueFromClient,
        ]);

        $responseData = json_decode(file_get_contents($recaptchaUrl), true);

        if (!$responseData['success']) {
            return response()->json(['message' => 'reCAPTCHA verification failed', 'status' => 'error']);
        } else {
            $formData = $request->validate([
                'surname' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'company_name' => 'required|string|max:255',
                'country' => 'required|string|max:255',
                'location' => 'required|string|max:255',
                'firstname' => 'required|string|max:255',
                'phone_number' => 'required|string|max:20',
                'shipping' => 'required|string|max:255',
                'installation' => 'required|string|max:255',
                'cartItems' => 'required|string',
            ]);

            if (empty($formData['code'])) {
                $formData['code'] = explode(' ', $formData['phone_number'])[0];
            }

            $formData['cartItems'] = json_decode($formData['cartItems'], true);

            try {
                // Save the form data to the database
                QuoteRequest::create($formData);

                // Send the email
                Mail::to('sheffieldafricamarketing@gmail.com')->cc($formData['email'])->send(new RequestQuoteMail($formData));

                return response()->json(['message' => 'Your Request Quote has been received', 'status' => 'success']);
            } catch (\Exception $exception) {
                return response()->json(['message' => $exception->getMessage(), 'status' => 'error']);
            }
        }
    }
}
