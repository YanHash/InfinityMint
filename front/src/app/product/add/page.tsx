"use client";

import {useForm} from "react-hook-form";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

export default function ProfileForm() {

    const form = useForm({
        defaultValues: {
            nftName: "",
            nftDescription: "",
            nftPrice: 0.00,
            nftImage: "",
            nftCollectionName: "",
        },
    });

    const onSubmit = (data: any) => {
        //todo appel back insertion
    };

    return (
        <div className={"container w-1/2 mx-auto mt-5 mb-5 justify-items-center text-center"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormLabel>Ajouter une oeuvre sur la marketplace</FormLabel>
                    <FormField
                        control={form.control}
                        name="nftName"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Nom de l'oeuvre" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Les acheteurs verront votre NFT sous ce nom.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nftCollectionName"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Nom de la collection de l'oeuvre" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Votre NFT appartiendra à cette collection.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nftDescription"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Description de l'oeuvre" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Les acheteurs pourront consulter votre description.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nftPrice"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Prix de l'oeuvre" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Les acheteurs pourront acquérir votre oeuvre pour ce montant.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nftImage"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Image de l'oeuvre" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Les acheteurs pourront voir cet aperçu de votre oeuvre.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Valider</Button>
                </form>
            </Form>
        </div>
    );
}
