'use client'

import { Users } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Pencil } from "lucide-react"
import UserForm from "../../forms/user/user-form"
import UpdateUserForm from "../../forms/user/update-user-form"
import { deleteUser } from "@/app/(user)/usuarios/actions"
import { toast } from "sonner"

export const userColumns: ColumnDef<Users>[] = [
    {
        accessorKey: "firstName",
        header: "Nome",
    },
    {
        accessorKey: "secondName",
        header: "Sobrenome"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "createdAt",
        header: "Data de Criação",
        cell: ({ row }) => {
            const { createdAt } = row.original
            return Intl.DateTimeFormat('pt-br', {
                dateStyle: "short"
            }).format(new Date(createdAt))
        }
    },
    {
        accessorKey: "updatedAt",
        header: "Data de Atualização",
        cell: ({ row }) => {
            const { updatedAt } = row.original
            return Intl.DateTimeFormat('pt-br', {
                dateStyle: "short"
            }).format(new Date(updatedAt))
        }
    },
    {
        accessorKey: "id",
        header: "",
        cell: ({ row }) => {
            const { id } = row.original
            const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
            const [isEditDialogOpen, setEditDialogOpen] = useState(false)
            return (
                <div className="flex gap-2">
                    <UpdateUserForm updatingUser={{ ...row.original, id: Number(row.original.id), password: "" }} />
                    <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="destructive">
                                <FontAwesomeIcon icon={faTrash} /> Excluir
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Excluir Usuário</DialogTitle>
                                <DialogDescription>
                                    Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
                                <Button variant="destructive" onClick={async () => {
                                    const { message, status } = await deleteUser(id)
                                    if (status === 200) {
                                        toast(message)
                                        setDeleteDialogOpen(false)
                                    }
                                }}>
                                    Excluir
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            )
        }
    }
]
