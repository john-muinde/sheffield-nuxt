<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Clear existing records to prevent duplicate entries
        Schema::disableForeignKeyConstraints();
        DB::table('role_has_permissions')->truncate();
        DB::table('model_has_roles')->truncate();
        DB::table('model_has_permissions')->truncate();
        Permission::truncate();
        Role::truncate();
        Schema::enableForeignKeyConstraints();

        // Define all permissions grouped by module
        $permissions = [
            // User Management
            'user-list',
            'user-create',
            'user-edit',
            'user-delete',

            // Roles & Permissions Management
            'role-list',
            'role-create',
            'role-edit',
            'role-delete',
            'permission-list',
            'permission-create',
            'permission-edit',
            'permission-delete',

            // Product Management
            'product-list',
            'product-create',
            'product-edit',
            'product-delete',

            // Category Management
            'category-list',
            'category-create',
            'category-edit',
            'category-delete',

            // Brand Management
            'brand-list',
            'brand-create',
            'brand-edit',
            'brand-delete',

            // Blog Management
            'blog-list',
            'blog-create',
            'blog-edit',
            'blog-delete',
            'blogCategory-list',
            'blogCategory-create',
            'blogCategory-edit',
            'blogCategory-delete',

            // Post Management
            'post-list',
            'post-create',
            'post-edit',
            'post-delete',

            // Showroom Management
            'showroom-list',
            'showroom-create',
            'showroom-edit',
            'showroom-delete',

            // Solution Management
            'solution-list',
            'solution-create',
            'solution-edit',
            'solution-delete',

            // Client Management
            'client-list',
            'client-create',
            'client-edit',
            'client-delete',

            // CSR Management
            'csr-list',
            'csr-create',
            'csr-edit',
            'csr-delete',

            // Testimonial Management
            'testimonial-list',
            'testimonial-create',
            'testimonial-edit',
            'testimonial-delete',

            // Event Management
            'event-list',
            'event-create',
            'event-edit',
            'event-delete',

            // Career Management
            'career-list',
            'career-create',
            'career-edit',
            'career-delete',

            // Project Management
            'project-list',
            'project-create',
            'project-edit',
            'project-delete',
        ];

        // Create permissions
        $createdPermissions = collect();
        foreach ($permissions as $permission) {
            $createdPermissions->push(Permission::create([
                'name' => $permission,
                'guard_name' => 'web'
            ]));
        }

        // Create Admin role
        $adminRole = Role::create([
            'name' => 'Admin',
            'guard_name' => 'web'
        ]);

        // Give all permissions to Admin
        $adminRole->givePermissionTo($createdPermissions);

        // Create Manager role
        $managerRole = Role::create([
            'name' => 'Manager',
            'guard_name' => 'web'
        ]);

        // Manager permissions
        $managerPermissions = [
            'product-list',
            'product-edit',
            'category-list',
            'category-edit',
            'brand-list',
            'brand-edit',
            'blog-list',
            'blog-edit',
            'client-list',
            'client-edit',
            'testimonial-list',
            'testimonial-edit'
        ];
        $managerRole->givePermissionTo($managerPermissions);

        // Create Editor role
        $editorRole = Role::create([
            'name' => 'Editor',
            'guard_name' => 'web'
        ]);

        // Editor permissions
        $editorPermissions = [
            'blog-list',
            'blog-create',
            'blog-edit',
            'post-list',
            'post-create',
            'post-edit',
            'event-list',
            'event-create',
            'event-edit'
        ];
        $editorRole->givePermissionTo($editorPermissions);

        // Create or update admin user
        $adminUser = User::updateOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('1234')  // Always hash passwords!
            ]
        );

        // Assign admin role
        $adminUser->syncRoles([$adminRole]);
    }
}
