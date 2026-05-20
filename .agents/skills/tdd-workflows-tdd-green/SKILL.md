---
name: "tdd-workflows-tdd-green"
description: "Implement the minimal code needed to make failing tests pass in the TDD green phase."
category: "custom-skill"
trigger: "/tdd-workflows-tdd-green"
---

# Green Phase: Simple function
def product_list(request):
    products = Product.objects.all()
    return JsonResponse({'products': list(products.values())})

# Refactor: Class-based view
class ProductListView(View):
    def get(self, request):
        products = Product.objects.all()
        return JsonResponse({'products': list(products.values())})

# Refactor: Generic view
class ProductListView(ListView):
    model = Product
    context_object_name = 'products'
